# alpine significa -> somente o minimo para executar o ambiente do node
FROM node:18-alpine
# WORKDIR é uma pasta dentro do container que vai ser a pasta principal de trabalho
WORKDIR /usr/app
# Copiando o "package.json" para dentro do WORKDIR ("./" significa WORKDIR)
COPY package.json ./
# Instalação das dependencias
RUN npm install
# Copiando todo o código fonte (tudo o que estiver na pasta junto com o Dockerfile) para dentro do container
COPY . .
# Declarando argumentoS que podeM ser passadoS para a imagem durante o processo de contrução
ARG MONGO_URI
ARG JWT_SECRET
# Declarando variáveis de ambiente que recebem os respectivos argumentos
ENV MONGO_URI=$MONGO_URI
ENV JWT_SECRET=$JWT_SECRET
# Cria um arquivo .env no diretório de trabalho do container contendo o valor da variável de ambiente MONGO_URI que está no arquivo .env do nosso projeto
RUN echo "MONGO_URI=${MONGO_URI}" > .env
# Essas duas outras são parecidas com a anterior mas sem a parte de criar o arquivo .env no diretório de trabalho do container, porque ele já existe agora
RUN echo "jWT_SECRET=${JWT_SECRET}" > .env
# Comando para fazer a build do projeto, configurada dentro de package.json
RUN npm run build
# Expondo a aplicação na porta 3010 (coloque a mesma porta que está configurada no projeto)
EXPOSE 3010
# ["node", "<caminho do diretório criado na build do projeto>"]
CMD ["node", "dist/main"]