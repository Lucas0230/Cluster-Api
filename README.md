# Cluster-Api

Esse é um projeto de estudos que surgiu devido à necessidade de melhorar a perfomance de uma api e aumentar sua tolerância a erros,
logo apartir dos meus estudos, encontrei a solução que seria implementar um cluster, e com base no vídeo Erick Wendel montei uma 
estrutura simples com módulos nativos do node.js.

-> Pimeiros Passos

Para começar, criei um servidor básico com express e instalai o pacote "autocannon" para testes de carga na nossa aplicação.

Adicionei o seguinte comando no package.json -> 

"test":"npx autocannon -c 500 -d 30 --workers 10 --renderStatusCode --latency --warmup [-c 1 -d 2] localhost:4000"

    -c = Número de processos executando aos mesmo tempo
    -d = Tempo dos testes (segundos)
    --workers = Número de threads 
    --renderStatusCodes = Gera resultados baseado no status das requisições
    --latency = Gera resultados de Latência
    --warmup = Roda requisições para inicializar a aplicação, antes dos testes principais


-- Cenário 1: testes na api normal

99% das requests tiveram uma latência de 6185 ms

8k requests em 30.08s

7660 requests com código 200

-> Após isso criei arquivo index.js onde fica o arquivo principal do cluster, que replica e divide os processos, tudo com módulos nativos do nodejs.

-- Cenário 2: testes na cluster api

99% das request tiveram uma latência de 4896 ms

47k requests in 30.07s, 7.71 MB read

46734 requests com código 200

-> Adicionei um setTimeout que mata os processos aleatóriamente, simulando um cenário com diversos erros na api.

-- Cenário 3: testes na cluster api com os processos morrendo (pior cenário possível)

99% das request tiveram uma latência de 10732 ms

26k requests in 30.07s

2k errors (89 timeouts)

22976 requests com código 200
