import sys
import camelot


def readPdf(filePdf):
    
    tables = camelot.read_pdf(filePdf,pages = 'all')

    textUc = []
    textSituation = []

    i = 0
    for table in tables:
        j=0
        tupleRowsCol = table.df.shape
        numberCol = tupleRowsCol[0]

        if(i == 0):
            j = 1
            while(j<numberCol):
                textUc.append(table.df[6][j])
                textSituation.append(table.df[11][j]) 
                j = j + 1

        else:
            while(j<numberCol):
                textUc.append(table.df[6][j])
                textSituation.append(table.df[11][j]) 
                j = j + 1

        i = i + 1

    for uc in textUc:
        print(uc.replace("\n", " ", 5))

if __name__ == '__main__':
    fileName = sys.argv[1] 
    readPdf(fileName)