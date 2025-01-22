#!/bin/bash

# 设置数据库连接信息
DB_USER="huafeng"
DB_PASS="HFhf991((!"
DB_NAME="huafengSQL"
DB_HOST="localhost"
DB_PORT="3306"

# 设置备份目录和文件名
BACKUP_DIR="./backup"
BACKUP_FILE="$BACKUP_DIR/huafengSQL_$(date +%Y%m%d_%H%M%S).sql"

# 确保备份目录存在
mkdir -p $BACKUP_DIR

# 执行备份
mysqldump -h $DB_HOST -P $DB_PORT -u $DB_USER -p$DB_PASS $DB_NAME > $BACKUP_FILE

# 检查备份是否成功
if [ $? -eq 0 ]; then
    echo "数据库备份成功: $BACKUP_FILE"
else
    echo "数据库备份失败"
    exit 1
fi

# 删除7天前的备份文件
find $BACKUP_DIR -name "huafengSQL_*.sql" -type f -mtime +7 -exec rm {} \; 