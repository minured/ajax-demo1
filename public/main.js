
console.log("我是main.js")


//请求CSS
getCSS.onclick = () => {
    //记住这四步
    const request = new XMLHttpRequest()   
    //方：专业前端只用这两个参数
    request.open('GET', '/style.css')

    request.onreadystatechange = () => {
        if (request.readyState === 4) {
        //下载完成，但不表示状态成功，还要判断request.status
            if(request.status >= 200 && request.status < 300) {
                console.log("CSS：")
                console.log(request.response)
                let style = document.createElement('style')
                style.innerHTML = request.response
                document.head.appendChild(style)
            }
        }   

    }

    request.send()
}

//加载js
getJS.onclick = () => {
    const request = new XMLHttpRequest()
    request.open("GET", "./2.js")
    request.onload = () => {
        console.log("2.js: ")
        const scriptTag = document.createElement("script")
        scriptTag.innerHTML = request.response
        document.body.appendChild(scriptTag)

    }
    request.onerror = () => {
        console.log("error")
    }
    request.send()
}

//加载HTML
getHTML.onclick = () => {
    const request = new XMLHttpRequest()
    request.open("GET", "./3.html")
    request.onload = () => {
        console.log("HTML: ")
        console.log(request.response)
        const container = document.createElement("template")
        container.innerHTML = request.response
        node = container.content.firstChild
        document.body.appendChild(node)
    }
    request.onerror = () => {
        console.log("error")
    }
    request.send()
}


//加载XML
getXML.onclick = () => {
    const request = new XMLHttpRequest()
    request.open("GET", "./4.xml")
    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
            // console.log("成功")
            console.log(request.response)
            console.log(request.responseXML)  //得到一个dom对象
            const dom = request.responseXML
            const text = dom.getElementsByTagName("warning")[0].textContent
            console.log(text.trim())

        }

    }
    request.send()
}


getJSON.onclick = () => {
    const request = new XMLHttpRequest()
    request.open("GET", "5.json")
    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
            console.log("JSON: ")
            console.log(request.response)
            const obj = JSON.parse(request.response)
            myName.innerText = obj.name
        }
    }
    request.send()
}


//请求分页
let n = 1
getPage.onclick = () => {
    console.log("next")
    const request = new XMLHttpRequest()
    request.open("GET", `page${n + 1}.json`)
    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
            console.log(request.response)
            let array = JSON.parse(request.response)
            array.forEach(item => {
                let li = document.createElement("li")
                li.innerHTML = item.id
                pageUl.appendChild(li)
            })
                         
        }
    }
    n += 1
    request.send()
}
