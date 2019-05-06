# SQL语句封装

### 1.非查询语句封装

```php
function mysq_exec($sql){
    //1.链接数据库
    $link = @ mysqli_connect(HOST,UNAME,PASSWORD,DB,PORT);
    //2. 判断是否链接成功
    if(!$link){
        echo "链接失败"；
        return false；
        // die('链接失败')；
    }
    // 3. 执行sql 语句
    $res = mysqli_query($link,$sql);
    if($res){
        echo "执行成功"；
        // 4.关闭数据库
        mysqli_close($link);
        return true;
    }else{
        echo "执行失败 <br>"；
        //打印报错信息
        echo mysqli_error($link);
        // 4. 关闭数据库
        mysqli_close($link);
        return false;
    }
}
```

### 2.查询语句封装

```php
function mysq_select($sql){
    $link = @ mysqli_connect(HOST,UNAME,PASSWORD,DB,PORT);
    if(!$link){
        die('数据库链接失败')；
    }
    $res = mysqli_query($link,$sql);
    
    if(!$res){
        echo "执行失败<br>";
        echo mysqli_error($link);
        mysqli_close($link);
        return false;
    }
    $arr = [];
    for($i = 0, $i < $res -> num_rows, $i++){
        $arr[] = mysqli_fetch_assoc($res);
    }
    mysqli_close($link);
    return $arr;
    
}
```

