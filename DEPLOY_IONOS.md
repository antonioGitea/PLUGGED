# 📦 Guía de Despliegue en IONOS VPS con Docker

## Prerrequisitos

Asegúrate de que en tu VPS IONOS tengas instalado:
- Docker (v20+)
- Docker Compose (v2+)
- Git
- SSH accesible

```bash
# Verificar instalaciones (en el VPS)
docker --version
docker-compose --version
```

---

## Paso 1: Conectarse al VPS via SSH

```bash
# Desde tu máquina local
ssh usuario@tu_vps_ionos_ip

# Ejemplo:
ssh root@123.45.67.89
```

---

## Paso 2: Preparar el servidor

```bash
# Entrar al directorio de aplicaciones (elige tu ruta)
cd /home/aplicaciones
# o
cd /root

# Clonar el repositorio
git clone <TU_REPO_URL>
cd PLUGGED
```

---

## Paso 3: Configurar variables de entorno

```bash
# Copiar el archivo de ejemplo
cp .env.example .env

# Editar variables (usa nano o vi)
nano .env
```

**Variables importantes a configurar:**

```env
DOMAIN=tu-dominio.com  # ⭐ IMPORTANTE: tu dominio apuntando a este VPS
DB_PASSWORD=tu_password_super_seguro_aqui
MYSQL_ROOT_PASSWORD=otro_password_seguro
```

> **⚠️ Seguridad:** Usa contraseñas fuertes y complejas. Las credenciales NO deben ir en Git.

---

## Paso 4: Configurar Caddyfile

```bash
# Verificar que Caddyfile.prod existe
ls backend/Caddyfile.prod

# Copiar como Caddyfile en producción
cp backend/Caddyfile.prod backend/Caddyfile
```

Si necesitas personalizar, edita `backend/Caddyfile`.

---

## Paso 5: Levantar los contenedores

### Opción A: Manual (paso por paso)

```bash
# 1. Construir las imágenes Docker
docker-compose -f docker-compose.prod.yml build

# Esto tardará varios minutos la primera vez...
# Incluye: compilar React, descargar dependencias PHP, etc.

# 2. Levantar los servicios
docker-compose -f docker-compose.prod.yml up -d

# 3. Esperar a que la BD esté lista (unos 10-15 segundos)
sleep 15

# 4. Ejecutar migraciones
docker-compose -f docker-compose.prod.yml exec -T php php artisan migrate --force

# 5. Generar APP_KEY (si no lo tiene)
docker-compose -f docker-compose.prod.yml exec -T php php artisan key:generate

# 6. Optimizar
docker-compose -f docker-compose.prod.yml exec -T php php artisan config:cache
docker-compose -f docker-compose.prod.yml exec -T php php artisan route:cache
```

### Opción B: Automático (ejecutar script)

```bash
# Dale permisos de ejecución
chmod +x deploy.sh

# Ejecutar
./deploy.sh
```

---

## Paso 6: Verificar que funciona

```bash
# Ver estado de los contenedores
docker-compose -f docker-compose.prod.yml ps

# Ver logs en tiempo real
docker-compose -f docker-compose.prod.yml logs -f

# Probar la aplicación
curl http://localhost
# o desde tu navegador
# https://tu-dominio.com (si el dominio apunta correctamente)
```

**Esperado:**
- ✅ `caddy` → UP
- ✅ `php` → UP
- ✅ `db` → UP

---

## Paso 7: Configurar el dominio (en IONOS)

En el panel de IONOS:

1. Ir a **Gestión de dominios**
2. Apuntar el dominio a tu VPS:
   - Tipo: **A**
   - Nombre: **@** (o tu subdominio)
   - Valor: **IP_DEL_VPS**
3. Esperar propagación DNS (5-48 horas)

Caddy generará certificado SSL automáticamente cuando el dominio esté resuelto.

---

## Comando de despliegue futuro

Después de hacer cambios en tu código:

```bash
# Entrar al VPS
ssh usuario@tu_vps

# Entrar al directorio
cd /ruta/a/PLUGGED

# Descargar cambios
git pull origin main

# Reconstruir solo si hay cambios en Dockerfile
docker-compose -f docker-compose.prod.yml build

# Reiniciar servicios
docker-compose -f docker-compose.prod.yml up -d

# Si hay migraciones nuevas
docker-compose -f docker-compose.prod.yml exec -T php php artisan migrate --force
```

---

## Solución de problemas

### "Connection refused"
```bash
# Verificar que los contenedores están activos
docker-compose -f docker-compose.prod.yml ps

# Ver logs de errores
docker-compose -f docker-compose.prod.yml logs
```

### Base de datos no se conecta
```bash
# Esperar a que MySQL esté listo
docker-compose -f docker-compose.prod.yml logs db

# Reintentar manualmente
docker-compose -f docker-compose.prod.yml exec -T php php artisan migrate --force
```

### HTTPS no funciona
```bash
# Caddy necesita que el dominio apunte correctamente
# Ver logs de Caddy
docker-compose -f docker-compose.prod.yml logs caddy

# El certificado se genera automáticamente cuando DNS propaga
```

### Actualizar solo el frontend

```bash
# Si solo cambió el frontend (sin cambios en Dockerfile)
docker-compose -f docker-compose.prod.yml exec -T php npm run build
# (esto asume que Node.js está en el contenedor de PHP)

# O reconstruir todo
docker-compose -f docker-compose.prod.yml build --no-cache
docker-compose -f docker-compose.prod.yml up -d
```

---

## Comandos útiles después del despliegue

```bash
# Ver estado
docker-compose -f docker-compose.prod.yml ps

# Ver logs en vivo
docker-compose -f docker-compose.prod.yml logs -f

# Ejecutar comandos Artisan
docker-compose -f docker-compose.prod.yml exec php php artisan <comando>

# Entrar a la BD
docker-compose -f docker-compose.prod.yml exec db mysql -u root -p

# Parar todo
docker-compose -f docker-compose.prod.yml down

# Reiniciar todo
docker-compose -f docker-compose.prod.yml restart

# Limpiar todo (⚠️ borra datos)
docker-compose -f docker-compose.prod.yml down -v
```

---

## Notas de seguridad

✅ **Lo que ya está hecho:**
- Credenciales en `.env` (no en repo)
- `APP_DEBUG=false` en producción
- HTTPS automático con Caddy
- Permisos correctos en directorios de Laravel

⚠️ **Revisa además:**
- Firewall del VPS (puertos abiertos solo 80, 443)
- Backup de la base de datos (volumen `db_data`)
- Logs de aplicación (en `storage/logs`)

---

**¿Preguntas?** Contacta al equipo de desarrollo 🚀
