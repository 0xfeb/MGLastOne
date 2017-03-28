# MGLastOne
## 功能
获取MongoDb中Collection的最后一个id值, 自增. MongoDb本身自带的_id用的是uuid, 运算成本太高了, 非常不实用, 所以用这个替代. 
## 用法
```
var mg = require('mglastone')

mg.MGConfig('mongodb://localhost:1700/MGLastOne')

mg.MGLastOneAsync('aaa')
    .then(function(m) {
        console.log(m)
    })
    .catch(function(error) {
        console.log(error)
    })
```
### API
* MGConfig -- 配置mongodb服务<br/>
* MGLastOne -- 递增获取ID值<br/>
* MGLastOneAsync -- 递增获取ID值, promise模式<br/>
* MGSetValue -- 手动设置ID值, 用在批量配置id值之后<br/>
* MGSetValueAsync -- 手动设置ID值, promise模式<br/>

## 安装
```
npm install mglastone
```