import os
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
                textSituation.append(table.df[14][j]) 
                j = j + 1

        else:
            while(j<numberCol):
                textUc.append(table.df[6][j])
                textSituation.append(table.df[14][j]) 
                j = j + 1

        i = i + 1

    i = 0

    if(len(textUc) == len(textSituation)):
        for i in range(len(textSituation)):
            if(textSituation[i] == 'APROVADO' or textSituation[i] == 'CUMPRIDO'):
                print(textUc[i].replace("\n", " ", 5))

    os.remove(filePdf)
                    

if __name__ == '__main__':
    fileName = sys.argv[1] 
    readPdf(fileName)