import sys
from pdf2docx import Converter


filename= sys.argv[1]
filepath= sys.argv[2]
converter=Converter('src/files/download/'+ filepath+ '/' + filename + '.pdf');
print(converter)
converter.convert('src/files/download/'+ filepath + '/' + filename + '.docx');
converter.close()

