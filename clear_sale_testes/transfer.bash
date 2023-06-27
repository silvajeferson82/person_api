#!/bin/bash


diretorio_origem="origem"


diretorio_destino="destino"

# Verifica se o diretório de destino existe
if [ ! -d "$diretorio_destino" ]; then
  # Cria o diretório de destino se não existir
  mkdir "$diretorio_destino"
fi

# Copia os arquivos com a extensão .txt do diretório de origem para o diretório de destino
cp "$diretorio_origem"/*.txt "$diretorio_destino"

# Exibe uma mensagem de sucesso
echo "Arquivos copiados com sucesso para o diretório $diretorio_destino."
