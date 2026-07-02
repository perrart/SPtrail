# Pasta de imagens do jogo

Coloque aqui (em `public/IMGS/`, não na raiz do repositório) os arquivos
`.png` gerados. O Vite copia tudo que está em `public/` para a raiz do
build automaticamente, então o código já referencia os caminhos como
`/IMGS/NOME_DO_ARQUIVO.png`.

## Bairros — `Z{PREFIXO}_{BAIRRO}_{DIA|NOITE}.png`

DIA aparece nos turnos de Manhã e Tarde. NOITE aparece no turno da Noite.

- Centro (ZC): REPUBLICA, SE, STA_CECILIA, LIBERDADE
- Norte (ZN): SANTANA, TUCURUVI, BRASILANDIA, VILA_MARIA
- Sul (ZS): SANTO_AMARO, VILA_MARIANA, CAMPO_LIMPO, CAPAO_REDONDO
- Leste (ZL): TATUAPE, MOOCA, ITAQUERA, SAO_MATEUS
- Oeste (ZO): PINHEIROS, VILA_MADALENA, BUTANTA, JAGUARE

Exemplos: `ZC_LIBERDADE_DIA.png`, `ZC_LIBERDADE_NOITE.png`, `ZO_PINHEIROS_DIA.png`...

## Personas — `PERSONA_{NOME}.png`

ARTISTA, CALL, ENTREGADOR, ESTAGIARIO, ESTUDANTE, FREELANCER, MOTORISTA, RECEM

Se uma imagem ainda não existir (ou o nome do arquivo não bater
exatamente), o jogo mostra o emoji correspondente no lugar — nada quebra,
é só um fallback visual até você subir os arquivos certos.
