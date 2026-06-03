#!/bin/bash

# Script para transferir proyecto a VPS via SCP
# Uso: ./push-vps.sh usuario@ip_vps ruta_en_vps

if [ $# -lt 2 ]; then
    echo "Uso: ./push-vps.sh usuario@ip_vps /ruta/destino"
    echo "Ejemplo: ./push-vps.sh root@123.45.67.89 /home/aplicaciones"
    exit 1
fi

VPS="$1"
REMOTE_PATH="$2"

echo "📤 Transfiriendo a $VPS:$REMOTE_PATH"

# Excluir archivos no necesarios
scp -r \
    --exclude='.git' \
    --exclude='node_modules' \
    --exclude='backend/src/vendor' \
    --exclude='.env' \
    --exclude='.DS_Store' \
    --exclude='*.log' \
    . "$VPS:$REMOTE_PATH/PLUGGED"

echo "✅ Transferencia completada!"
echo ""
echo "Siguiente paso:"
echo "  ssh $VPS"
echo "  cd $REMOTE_PATH/PLUGGED"
echo "  cp .env.example .env"
echo "  # editar .env con tus datos"
echo "  ./deploy.sh"
