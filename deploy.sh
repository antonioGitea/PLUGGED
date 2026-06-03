#!/bin/bash

# Script de despliegue para IONOS VPS con Docker
# Uso: ./deploy.sh

set -e

echo "🚀 Iniciando despliegue de Plugged en IONOS..."

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Clonar/actualizar repositorio
echo -e "${BLUE}1️⃣ Actualizando repositorio...${NC}"
if [ -d "PLUGGED" ]; then
    cd PLUGGED
    git pull origin main
else
    git clone <TU_REPO_URL> PLUGGED
    cd PLUGGED
fi

# 2. Crear archivo .env
echo -e "${BLUE}2️⃣ Configurando variables de entorno...${NC}"
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo -e "${YELLOW}⚠️  Edita .env con tus datos:${NC}"
    echo "   - DOMAIN: tu dominio"
    echo "   - DB_PASSWORD: contraseña segura"
    echo "   - MYSQL_ROOT_PASSWORD: contraseña root"
    echo ""
    echo "Presiona Enter cuando hayas editado .env..."
    read
else
    echo "✅ .env ya existe"
fi

# 3. Construir imágenes Docker
echo -e "${BLUE}3️⃣ Construyendo imágenes Docker...${NC}"
docker-compose -f docker-compose.prod.yml build

# 4. Levantar servicios
echo -e "${BLUE}4️⃣ Levantando servicios...${NC}"
docker-compose -f docker-compose.prod.yml up -d

# 5. Ejecutar migraciones de Laravel
echo -e "${BLUE}5️⃣ Ejecutando migraciones de base de datos...${NC}"
docker-compose -f docker-compose.prod.yml exec -T php php artisan migrate --force

# 6. Generar APP_KEY si no existe
echo -e "${BLUE}6️⃣ Generando APP_KEY...${NC}"
docker-compose -f docker-compose.prod.yml exec -T php php artisan key:generate

# 7. Optimizar
echo -e "${BLUE}7️⃣ Optimizando aplicación...${NC}"
docker-compose -f docker-compose.prod.yml exec -T php php artisan config:cache
docker-compose -f docker-compose.prod.yml exec -T php php artisan route:cache
docker-compose -f docker-compose.prod.yml exec -T php php artisan view:cache

echo -e "${GREEN}✅ ¡Despliegue completado!${NC}"
echo ""
echo "📍 Tu aplicación está disponible en: https://$(grep DOMAIN .env | cut -d '=' -f2)"
echo ""
echo "📋 Comandos útiles:"
echo "   Ver logs: docker-compose -f docker-compose.prod.yml logs -f"
echo "   Reiniciar: docker-compose -f docker-compose.prod.yml restart"
echo "   Parar: docker-compose -f docker-compose.prod.yml down"
