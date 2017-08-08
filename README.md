# homepage
## contents
My personal website's home page.
<a href="https://www.rustinz.com">Visit it</a>

# Rustin Zhang
## 以下是我的简历，当然，它确实运行在我的服务器上
## Below is my resume, it's a real app running on my server

```js
"use strict";
const server = require('http').createServer();
let resume = {
    "Name": "Rustin Zhang",
    "Location": [ "Shenzhen", "China" ],
    "Homepage": "https://www.rustinz.com/",
    "Repository": "https://github.com/RustinZhang",
    "Contacts": {
        "mail": "rustin.zhang@gmail.com",
        "phone": "GET it from server"
    },
    "Occupation": "programmer",
    "Dedicate": "Front-end web development",
    "Goal": "To develop extraordinary web apps",
    "Technologies": {
        "grasped": {
            "languages": {
                "programming":  {
                    "JavaScript": {
                        "core": [ "ES5","ES2015&beyond" ],
                        "API": "DOM",
                        "libraries": "on demand"
                    }
                },
                "styleSheets":   ["CSS", "Sass"],
                "markup":       "HTML"
            }
        },
        "understood": {
            "telecommunications network": "TCP/IP"
        },
        "familiar": {
            "toolkits": {
                "task runner":      "Gulp.js",
                "module bundler":   "Webpack"
            },
            "work environment": {
                "OS": "Mac OS",
                "IDE": "WebStorm",
                "terminal": "iTerm"
            },
            "runtime environment": "node.js",
            "package manager": "npm",
            "version control system": "Git"
        }
    },
    "Skills": {
        "English": true,
        "search engine": true,
        "self-study": true,
        "teamwork": true
    }
}

server.on( 'request', (req, res) => {
    res.statusCode = 200;
    res.end(Buffer.from(JSON.stringify(resume)));
}).on('error',(e)=>{
    console.log(`Error ${e} on resume.js`);
});
server.listen(5000);                   
```
### 出于隐私的考虑，避免电话太直白地暴露，我将其放在了服务器上
### For the concern of privacy, you need to get my phone number from server(if you need).
#### 获得简历的 API： 
#### Download API:
* Method:'GET'
* URL: See example ↓

#### 以下是一个例子，当然，只是想要看到简历并没那么复杂，同行必然都会，如果获取不到了，大概说明我不需要找工作了:D
#### Of course, you can reach the full resume via a easier way, I'm not intend to conceal it. If you can't download, maybe I'm not seeking employment.

```js
const team_member = require('https');
team_member.get( 'https://www.rustinz.com/Hire', (req,res) => {
    const {statusCode} = response;
    if (statusCode===200) {
        response.on('data', (chunck) => {
            let resume = JSON.parse(chunck.toString());
            console.log(resume);
        })
    }
})
