using Microsoft.AspNetCore.Mvc;
using Todo.Data;
using Todo.Models;
using System.Diagnostics;
using System.Text.RegularExpressions;

namespace Todo.Controllers
{
    [ApiController]
    public class HomeController : ControllerBase
    {
        // All Users info
        [HttpGet("/teste")]
        public IActionResult Get([FromServices] AppDbContext context) 
            =>Ok(context.TodoUsers.ToList());

        // User sign in
        [HttpPost("/signin")]//[HttpGet("/signin")] 
        public IActionResult Get([FromBody] LoginUser loginUser,[FromServices] AppDbContext context)
        {
            var user = context.TodoUsers.FirstOrDefault(x=> x.Email ==loginUser.Email);
            if (user == null)
                return NotFound("Não existe esse usuário");

            if (user.Password == loginUser.Password)
                return Ok(user.Id);
    
            return BadRequest("Senha inválida");
            
        }

        // Create a user
        [HttpPost("/signup")]  
        public IActionResult Post(
            [FromBody] TodoUser user, 
            [FromServices] AppDbContext context)
        {
            
            var model = context.TodoUsers.FirstOrDefault(x=> x.Email == user.Email);

            if(model == null)
            {
                context.TodoUsers.Add(user);
                context.SaveChanges();
                return Ok(user.Id);
            }
            
            return BadRequest("Já existe esse email");
        }

        // Update a user
        [HttpPut("/{id:int}")]
        public IActionResult Put(
            [FromRoute] int id,
            [FromBody] TodoUser user,
            [FromServices] AppDbContext context)
        {
            var model = context.TodoUsers.FirstOrDefault(x=> x.Id == id);
            if (model == null)
                return NotFound("Não existe esse usuário");
            
            model.Name = user.Name;
            model.Email = user.Email;
            model.Password = user.Password;
            context.SaveChanges();
            return Ok("Atualizado com sucesso");
        

        }

        // Delete a user 
        [HttpDelete("/{id:int}")]
        public IActionResult Delete(
            [FromRoute] int id,
            [FromServices] AppDbContext context)
        {
            var user = context.TodoUsers.FirstOrDefault(x=> x.Id == id);
            if (user == null)
                return NotFound("Não existe esse usuário");
            
            context.TodoUsers.Remove(user);
            context.SaveChanges();
            return Ok(user.Id);

        }

        //add Ucs of a pdf
        /*
        [HttpPost("/File/{id:int}")]
        public IActionResult UploadFile(
            [FromRoute] int id,
            [FromForm] IFormFile file, 
            [FromServices] AppDbContext context)
        {
            var user = context.TodoUsers.FirstOrDefault(x=> x.Id == id);
            if (user == null)
                return NotFound("Não existe esse usuário");
            
            if (file.Length > 0) {
                string filePath = $"/home/leoenne/Música/Projeto_Engenharia_de_Computação/Todo/{file.FileName}";
                using (Stream fileStream = new FileStream(filePath, FileMode.Create)) {
                    file.CopyTo(fileStream);
                }
            }

            var cmd = "/home/leoenne/Música/Projeto_Engenharia_de_Computação/Todo/ReadPDf.py";
            var args = file.FileName;

            ProcessStartInfo start = new ProcessStartInfo();
            start.FileName = "/usr/bin/python3";
            start.Arguments = string.Format("{0} {1}", cmd,args);
            start.UseShellExecute = false;
            start.RedirectStandardOutput = true;
            using(Process process = Process.Start(start))
            {
                using(StreamReader reader = process.StandardOutput)
                {
                    string result = reader.ReadToEnd();
                    char finalChar = '\n';
                    string finalUcs = result.TrimEnd(finalChar);
                    user.UCs = finalUcs;
                    context.SaveChanges();
                    return Ok("Matérias adicionadas");
                }
            }
        
        }
        */

        // Verify Uc Prereq
        [HttpPost("/Prereq/{id:int}")]
        public IActionResult VerifyPrereq([FromRoute] int id,
        [FromBody] Uc name,
        [FromServices] AppDbContext context)
        {
            string aux = name.UC.ToUpper();
            aux = aux.Trim();
            aux = Regex.Replace(aux, @"\s+", " ");
            
            var uc = context.Ucs.FirstOrDefault(x=> x.UC == aux);
            var user = context.TodoUsers.FirstOrDefault(x=> x.Id == id);
            var ucsUser = new List<string>();
            
            if (uc == null)
                return NotFound("Não existe essa Uc");

            if (user == null)
                return NotFound("Não existe esse usuário");

            var ucPrereqs = uc.UcPrereq.Split(";").ToList();
            if(user.UCs != null)
                ucsUser = user.UCs.Split("\n").ToList();

            for (int i = 0; i < ucsUser.Count; i++)
            {
                if (ucsUser[i] == uc.UC)
                    return Ok("Usuário já tem essa matéria");        
            }

            for (int i = 0; i < ucPrereqs.Count; i++)
            {
                ucPrereqs[i] = ucPrereqs[i].Trim(); 
            }

            int count = 0;

            for (int i = 0; i < ucPrereqs.Count; i++)
            {
                for (int j = 0; j < ucsUser.Count; j++)
                {
                    if (ucsUser[j] == ucPrereqs[i])
                        count++;
                }
            }

            if(ucPrereqs[0] == "NÃO HÁ")
                return Ok("Usuário tem os pré-requisitos para fazer essa matéria");

            else if(count == ucPrereqs.Count)
                return Ok("Usuário tem os pré-requisitos para fazer essa matéria");

            else
                return Ok("Usuário não tem os pré requisitos para fazer essa matéria");
    
        }

        // Add Ucs manually
        [HttpPost("/UCadd/{id:int}")] // Read the subjects that passed
        public IActionResult UploadUc(
            [FromRoute] int id,
            [FromBody] Uc nameUc, 
            [FromServices] AppDbContext context)
        {
            var model = context.TodoUsers.FirstOrDefault(x=> x.Id == id);
            if (model == null)
                    return NotFound("Não existe esse usuário");
                    
            if (context.Ucs != null) {
                var ucs = context.Ucs.ToList();
                
                string aux = nameUc.UC.ToUpper();
                aux = aux.Trim();
                aux = Regex.Replace(aux, @"\s+", " ");
            
                var count = 0;

                for (int i = 0; i < ucs.Count; i++)
                {
                    if(aux == ucs[i].UC)
                        count++; 
                }

                if(count < 1)
                    return BadRequest("Essa Uc não existe");

                if (model.UCs != null) {
                    var ucsUser = model.UCs.Split("\n").ToList();

                    if(ucsUser.IndexOf(aux) != -1)
                        return BadRequest("Usuário já tem essa Uc");
                    else
                        model.UCs = model.UCs + "\n" + $"{aux}";
                }
                else
                    model.UCs = model.UCs + "\n" + $"{aux}";
            }
            else {
                string aux = nameUc.UC.ToUpper();
                model.UCs = model.UCs + "\n" + $"{aux}";
            }
            context.SaveChanges();

            return Ok("Máteria adicionada");
        }

        // Add Ucs manually
        [HttpGet("/UCs")] // Read the subjects that passed
        public IActionResult LoadUc( 
            [FromServices] AppDbContext context)
        {
            var ucs = context.Ucs.ToList();

            var aux = new List<string>();
            
            for (int i = 0; i < ucs.Count; i++)
            {
                aux.Add(ucs[i].UC); 
            }

            return Ok(aux);
        }

        // Get Ucs of user
        [HttpGet("/UcsUser/{id:int}")]
        public IActionResult GetById([FromRoute] int id,
        [FromServices] AppDbContext context)
        {
            var user = context.TodoUsers.FirstOrDefault(x=> x.Id == id);
            if (user == null)
                return NotFound("Não existe esse usuário");

            if(user.UCs == null)
                return Ok("Não tem Ucs");


            var ucs = user.UCs.Split("\n").ToList();

            return Ok(ucs);
        }

        // Add the table of prereq 
        [HttpPost("/Prereq/addTab")]
        public IActionResult VerifyPrereq([FromBody] string tudo,
        [FromServices] AppDbContext context)
        {

            var auxs = tudo.Split(" /// ").ToList();

            var listauc = new List<string>();
            var listapreq = new List<string>();

            var f = 0;
            string a;
            foreach (var aux in auxs)
            {
                if(f == 0)
                {
                    a = aux.Trim();
                    a = a.ToUpper();
                    a = Regex.Replace(a, @"\s+", " ");
                    listauc.Add(a);
                    f++;
                }
                else
                {
                    a = aux.Trim();
                    a = a.ToUpper();
                    a = Regex.Replace(a, @"\s+", " ");
                    listapreq.Add(a);
                    f = 0;
                }
            }
            listauc.Remove("");

            // for (int i = 0; i < listauc.Count; i++)
            // {
            //     var uc = new Uc();
            //     uc.UC = listauc[i];
            //     uc.UcPrereq = listapreq[i];
            //     context.Ucs.Add(uc);
            //     context.SaveChanges();

            // }

            return Ok(context.Ucs.ToList());
        }

    }
}