using Microsoft.AspNetCore.Mvc;
using Todo.Data;
using Todo.Models;
using System.IO;
using System.Diagnostics;

namespace Todo.Controllers
{
    [ApiController]
    public class HomeController : ControllerBase
    {
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
            //model.UCs=null;
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

        //Save Ucs of pdf
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


        // Add Ucs manually
        [HttpPost("/UC/{id:int}")] // Read the subjects that passed
        public IActionResult UploadUc(
            [FromRoute] int id,
            [FromBody] string uc, 
            [FromServices] AppDbContext context)
        {
            var model = context.TodoUsers.FirstOrDefault(x=> x.Id == id);
            if (model == null)
                return NotFound("Não existe esse usuário");
            
            if(model.UCs == null)
            {
                model.UCs = uc;
                context.SaveChanges();
                return Ok("Máteria adicionada");

            }
            
            var ucs = model.UCs.Split("\n").ToList();

            if(ucs.IndexOf(uc) != -1)
                return BadRequest("Já existe essa Uc");
            else
                model.UCs = model.UCs + "\n" + uc;

            context.SaveChanges();

            return Ok("Máteria adicionada");
        }

        // Get Ucs of user
        [HttpGet("/{id:int}")]
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


    }
}