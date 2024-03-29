<!--
 * @Date: 2021-03-29 09:22:08
 * @LastEditors: hanjiawang
 * @LastEditTime: 2021-05-07 20:50:50
-->
### TCP/IP四层模型
   - 应用层：为用户提供应用程序的通信功能
     - http、FTP、DNS
     - http负责向目标ip地址发出http请求报文，若是域名使用DNS解析
   - 传输层
     - tcp、udp
     - tcp为了数据可靠传输，将请求报文分段并给每段加上序号和(端口号本机2 16的和目标服务器的web默认80)，打上tcp头
   - 网际层
     - ip协议，通过fap协议反差出mac地址，打上ip头
   - 链路层
     - 根据mac地址处理连接网络的硬件部分，控制操作系统和网卡，处理物理层面的连接；

### OSI七层网络模型
   - 应用层
   - 表示层
   - 会话层
   - 传输层
   - 网络层
   - 链路层
   - 物理层
### 应用层 Http协议
- cookie
  - cookie 是存储在客户端的一小块数据，http 是无状态的，cookie 的作用就是维护状态，让服务器知道两次请求来自同一个客户端；cookie 是在第一次请求中由服务端放在响应头的 setCookie 字段中，浏览器收到会将其缓存，下次请求时会自动带着 cookie 表明身份；
  - cookie 的属性，以建值对的形式存储，name: value; domain: 域名，指定能够携带的目标域名; path: 路径，必须包含这个路径才能携带 cookie domin 和 path 共同指定了 cookie 的作用域; secure: true 只会在安全协议中; Expires/Max-age: 过期时间/存活秒数; httpOnly: 是否可用 JS 获取修改 cookie; SameSite：strict 只允许相同站点（跨站请求不允许携带 cookie），Lax 允许部分第三方（a，get 的 form 表单，link）（iframe、ajax、img、post 表单都不允许），None 无论是否跨站都发送
  - cookie 缺陷
    - 容量：大小只有 4KB
    - 性能：若不设置路径的情况下，访问相同域名都会带上 cookie，造成不必要的资源浪费
    - 安全：以纯文本形式传输，容易被截取恶意携带 cookie 向服务器发送请求 XSS 攻击；可被 JS 读写

- 跨域
  - 由于浏览器的同源策略（协议主机和端口均相同），向不同源的服务器发送请求会造成跨域，该请求发出后，服务器会作出响应，但如果响应头中没有 CORS 字段，浏览器会把响应废弃；
  - 解决办法
    - JSONP
      - 虽然 XMLHttpRequest 对象遵循同源政策，但是 script 标签不一样，它可以通过 src 填上目标地址从而发出 GET 请求，实现跨域请求并拿到响应。
        将 get 和回调函数拼接放入 src 属性中发出 get 请求，服务端将返回数据放入回调函数入参中即可，客户端script标签会执行返回的方法；
    - CORS（跨域资源共享）
      - 浏览器发出请求时会添加 Origin 字段，服务器拿到请求之后，在回应时对应地添加 Access-Control-Allow-Origin 字段，
        如果 Origin 不在这个字段的范围中，那么浏览器就会将响应拦截。
    - Nginx 反向代理
      - 比如客户端为 client.com，服务器为 server.com，客户端向服务器请求访问 server.com/api，Nginx 相当于起了一个跳板机，
        这个跳板机的域名也是 client.com，让客户端首先访问 client.com/api，这当然没有跨域，然后 Nginx 服务器作为反向代理，
        将请求转发给 server.com，当响应返回时又将响应给到客户端，这就完成整个跨域请求的过程。

- 常见状态码
  - 1xx: 接受，继续处理
  - 200: 成功，并返回数据
  - 201: 已创建
  - 202: 已接受
  - 203: 成功，但未授权
  - 204: 成功，无内容
  - 205: 成功，重置内容
  - 206: 成功，部分内容
  - 301: 永久移动，重定向
  - 302: 临时移动，可使用原有 URI
  - 304: 资源未修改，可使用缓存
  - 305: 需代理访问
  - 400: 请求语法错误
  - 401: 要求身份认证
  - 403: 拒绝请求
  - 404: 资源不存在
  - 500: 服务器错误

- get/post 区别
  - get 请求在 url 中，post 在请求体中，导致 get 请求不安全
  - get 请求有缓存，post 请求没有
  - 浏览器后退时 get 请求不会重新发送，post 会
  - get 请求受 url 长度限制，post 不会

- TLS 握手（http 和 tcp 的中间层 TLS 协议）
  - 客户端生成随机数 client_random 以及加密套件发送给服务端
  - 服务端返回确定的加密算法以及证书和随机数 server_random
  - 客户端解析证书确认身份同时获取公钥，生成随机数 pre_random，将随机数用公钥加密，用三个随机数得出密钥
  - 服务端用私钥解密得到 pre_random，同时用三个随机数生成密钥

- http 缓存（分为浏览器直接判断的强缓存和发送 http 请求让服务端判断的协商缓存）
  - 强缓存
    - 首先是检查强缓存，这个过程不需要发送 http 请求。http/1.0 当中靠 Expires 来检查，Expires 存在于服务端响应头中，标明了缓存的过期时间。
      当浏览器要继续发送该请求时会对比当前时间和过期时间，没过期命中，过期了发送 http 请求进入协商缓存阶段（缺陷，服务端和客户端时间有可能不同）。
      http/1.1 当中使用 Cache-control 来判断，也存在于响应头当中，使用 max-age 字段标明了缓存的存活时间，秒为单位，表示未来的多长时间可以使用缓存。
      过期进入协商缓存。
  - 协商缓存
    - 强缓存失效后，浏览器发送 http 请求时会携带相应的缓存标签用来给服务端判断是否命中协商缓存。缓存标签分为两种。
      - Last-Modified：
        即最后修改时间。在浏览器第一次给服务器发送请求后，服务器会在响应头中加上这个字段。
        浏览器接收到后，如果再次请求，会在请求头中携带 If-Modified-Since 字段，这个字段的值也就是服务器传来的最后修改时间。
        服务器拿到请求头中的 If-Modified-Since 的字段后，其实会和这个服务器中该资源的最后修改时间对比:如果请求头中的这个值小于最后修改时间，
        说明是时候更新了。返回新的资源，跟常规的 HTTP 请求响应的流程一样。否则返回 304，告诉浏览器直接用缓存。
      - ETag：
        服务器根据当前文件的内容，给文件生成的唯一标识，只要里面的内容有改动，这个值就会变。
        服务器通过响应头把这个值给浏览器。浏览器接收到 ETag 的值，会在下次请求时，将这个值作为 If-None-Match 这个字段的内容，并放到请求头中，
        然后发给服务器。服务器接收到 If-None-Match 后，会跟服务器上该资源的 ETag 进行比对:如果两者不一样，说明要更新了。
        返回新的资源，跟常规的 HTTP 请求响应的流程一样。否则返回 304，告诉浏览器直接用缓存。

- http2 有何改进，同一个域名只用一个TCP连接，这样只需要一次慢启动，避免多个tcp连接竞争带宽的问题
   - 头部压缩
      - HPACK算法通过在浏览器和服务端维护一张索引表，将相同文本替换为索引值明显缩小了文件体积
   - 多路复用
      - 在http协议下方增加了二进制分帧层，将请求行请求头请求体转化为一个个带有ID编号的帧，传输给服务器，服务器收到根据ID组合成完整的请求；解决应用层的队头堵塞问题
      - 可以设置请求的优先级
      - 服务器主动推送
   - TCP层的队头堵塞：由于数据包丢失等待超时重传的过程；在1.1中浏览器维护6个tcp连接，一个堵塞了还有5个，但是http2只有一个，所以如果在丢包率较高的网络环境下http2表现不如http1.1

- http3的改进
   - 基于UDP实现了QUIC协议，在UDP上层添加的QUIC协议继承了类似TCP的流量控制和数据包重传、拥塞处理等
   - 继承了TSL握手
   - 实现了http2的多路复用
   - 快速握手
   - 但是http3对底层协议的改动较大，浏览器的兼容性较差；中间设备的支持性以及操作系统对UDP的优化不及TCP

- http如何进行大文件传输
   - 数据压缩
  浏览器请求头Accept-Encoding表明支持的压缩方式gzip、deflate、br 服务器选择一种放进Content-Encoding响应头，文件压缩后发送给浏览器
  缺点：只对文本文件有比较好的压缩率，对图片音频视频等效果一般
   - 分块传输
  chunked分块传输编码，响应报文头字段Transfer-Encoding:chunked 报文的body不是一次性发送，分成许多的块逐个发送；浏览器收到会按照规则组装数据
  报文结构：
    1. 每段数据包含两部分，长度头和数据块
    2. 长度头由一个16进制数字表示 以一个CRLF换行(回车+换行\r回车\n换行)
    3. 数据块跟在长度头后，也已CRLF换行结尾，但数据不包含CRLF
    4. 最后用一个长度为0的块表示结束0\r\n\r\
   - 范围请求
    分块传输解决大文件问题，实际场景中需要只获取大文件的片段数据，比如视频挪动进度条、多段下载、断点续传等，服务器必须在响应头里使用字段“Accept-Ranges: bytes”表示支持范围请求
      客户端通过请求头Range: bytes=x-y表示要请求的部分
      服务器收到后要做的事情：
        1. 检查范围是否合法，若超出文件范围返回416 表示请求范围有误
        2. 范围正确根据范围截取数据返回206 表示body是原数据一部分
        3. 服务器要添加一个响应头字段 Content-Range，告诉片段的实际偏移量和资源的总大小，格式是“bytes x-y/length”，与 Range 头区别在没有“=”，范围后多了总长度。例如，对于“0-10”的范围请求，值就是“bytes 0-10/100”
  - 多段范围请求
  支持多段x-y
  响应部分每一个分段必须以“- -boundary”开始（前面加两个“-”），之后要用“Content-Type”和“Content-Range”标记这段数据的类型和所在范围，然后就像普通的响应头一样以回车换行结束，再加上分段数据，最后用一个“- -boundary- -”（前后各有两个“-”）表示所有的分段结束。

- 短连接长连接
  http0.9/1.0每次请求前和服务器建立连接收到响应报文后会立即关闭连接，客户端和服务端连接时间很短就称为短连接；
  http1.1开始默认启用长连接，请求头中可以使用Connection: keep-alive表示，不管客户端有没有表示需要长连接，服务器如果支持长连接就会在响应头Connection: keep-alive浏览器就会一直使用这个tcp连接收发数据
  长连接的断开：
    通常由客户端断开，请求头里加上“Connection: close”，服务端也会在响应报文加上“Connection: close”，发送后调用SocketApi 关闭TCP连接
    服务端可以设置长连接超时时间 使用“keepalive_timeout”指令 在这段时间内没有任何数据收发就断开连接避免占用公共资源
    服务端也可以设置长连接最大请求次数 使用“keepalive_requests”指令

- 对头阻塞：由于http报文规定必须是一收一发，多个http请求就会形成一个先入先出的串行队列，没有轻重缓急的概念，如果队首请求时间过长，就会造成整个队列堵塞的问题
   - 并发连接
    浏览器通过同时维护多个长链接并发连接解决对头堵塞；通常6-8个
   - 域名分片
     服务器维护多个域名指向同一个服务
     
### 传输层协议Tcp/UDP
- UDP 和 TCP 区别
  UDP 是面向无连接的传输层协议，有不可靠性；不会对数据进行备份和排序，不管数据是否有序到达接收方，也没有流量控制和拥塞处理算法，导致在网络环境不好的情况下容易丢包；但是这也体现了 UDP 轻便的特点，在需要实时传输的场景有很好的应用，比如网络直播网络游戏等；
  TCP 是面向连接的传输层协议，通过超时重传协议保证了数据的完整性；流量控制和拥塞处理算法解决了网络拥塞问题，能保证在不同网络环境下稳定传输；但保证稳定的同时也就丢失了一些实时性；

- TCP 怎么保证数据完整到达接收方
  通过超时重传协议（ARQ）；
  - 停止等待 ARQ：当发送方发出报文时会打开一个定时器，在定时器结束之前收到接收方应答就是正常；如果未收到就会重传之前的报文；如果确认报文丢失，发送方会继续发送，接收方会丢弃这段报文等待新报文的接收；（定时器的设置会大于一个 RTT 从发出报文到接收到对端确认报文的时间）
  - 连续 ARQ：发送方会维持一个发送窗口，在窗口范围内连续分组发送数据，接收方不会连续确认，而是过一段时间后，将接收到的数据中按序到达的最后一个分组确认，发送方每收到一次确认就往前滑动一个分组；

- 三次握手（为什么三次握手，什么是半连接队列，握手过程可以传输数据吗，什么是 SYN 攻击）
  - 三次握手过程
    - 双方都是 Close 状态，客户端发送 SYN 包请求连接（包含 SYN=1，初始序列号 seq=x，确认为 ACK 为 0）进入 SYN_send 状态
    - 服务端收到连接请求，将连接放入半连接队列中，回复 SYN+ACK 确认包（SYN=1，确认位 ACK=1，初始序列号 seq=y，确认序列号 ack=x+1）进入 SYN_Received 状态
    - 客户端收到确认，回复 ACK 确认包（ACK=1，ack=y+1，seq=x+1（第一次消耗一个序列号）），进入 established 状态，服务端收到客户端确认包后也会进入 ESTABLISHED 状态，并把连接放入全连接队列。
  - 为什么三次握手
    确认双方收发能力正常，同时为了避免因网络状况造成的服务端资源浪费问题，场景为客户端超时请求连接报文被服务端接收，服务器再次进入 ESTABLISHED 状态，而此时客户端已经 CLOSE，服务端一直等待客户端数据，造成资源浪费
  - 什么是半连接队列
    存放客户端 IP 地址，第一次握成功的客户端 IP 地址
  - SYN 攻击
    使用伪造 IP 地址一直给服务端发送连接请求导致服务端半连接队列爆满，造成服务端一直给假 IP 发送确认包，造成资源浪费，也使真正的请求无法被接收；解决方法可以增大半连接队列，减少重传次数；

- 四次挥手（为什么四次握手）
  - 四次挥手过程
    - 客户端向服务端发送 FIN 断开请求（FIN=1，ACK=0，seq=x）进入 FIN_WAIT1 状态
    - 服务端接收到，发送确认断开包（ACK=1，ack=x+1），进入 CLOSE_WAIT 状态；表明此时 a 到 b 的连接已断开，不会再接受 a 的数据，但此时服务端可能仍有数据要发送
    - 服务端数据发送完毕也要断开连接了，给客户端发送断开请求包（FIN=1，ACK=0，seq=y）进入 LAST_ASK 状态
    - 客户端收到，发送确认包（ACK=1，ack=y+1），进入 FIN_WAIT2 状态，等到 2MSL（报文最大存活时间，确保服务端收到自己的确认，如果未收到就断开连接，服务端会一直等待客户端的确认，导致服务端不能正常关闭）后进入 CLOSE 状态，服务端收到后进入 CLOSE 状态；
  - 为什么四次挥手
    服务端可能未发送完数据，等等发送完才能断开连接

- 流量控制和拥塞处理
  - 流量控制 - 滑动窗口（解决丢包，数据不对以及流量控制的问题）
    TCP 中发送端和接收端各维护着一个窗口，发送窗口和接收窗口，发送窗口包含已发送但未得到确认的数据和可以发送但未发送的数据；发送窗口的大小
    是由接收方接收窗口的剩余大小决定的；接收方会把窗口剩余大小放入应答包中发送给发送方，发送方根据大小以及网络情况确定发送窗口的大小；这样确保了接收方能够接收到数据，避免了接收方带宽已满但发送方仍在发送的问题；接收方为 0 窗口时，发送方会设定定时器，定时询问接收方窗口大小，若超过一定次数会中断 TCP 连接；
    拥塞处理（防止过多数据拥塞网络，保证长时间稳定的在不同网络环境中较好的传输数据）
  - 拥塞处理（解决网络问题）
    - 慢启动
      1.  将发送窗口设为 1MSS（1 分段最大数据量）
      2.  每过一个 RTT 将窗口大小乘 2
      3.  有一个阀值限制，超过阀值启动拥塞避免算法
    - 拥塞避免：每过一个 RTT 把窗口大小+1，当定时器时间到了没收到确认包时统一认定是网络拥塞问题，进行如下处理
      1.  将阀值设置为当时窗口的一半
      2.  发送窗口设置为 1MSS
      3.  启动拥塞避免算法
    - 快速重传-快恢复
      - 当报文失序时，接收方会发送最后一个有序的序号作为应答，当发送端收到三个相同的 ACK 时，不等待定时器结束，开始快速重传算法；
      - TCP Reno
        1. 发送窗口减半
        2. 阀值设置为当前拥塞窗口
        3. 进入快恢复阶段（重发对端需要的包，一旦收到一个新的 ACK 答复就退出该阶段），这种方式在丢失多个包的情况下就不那么好了
        4. 启动拥塞避免算法
      - TCP New Ren 改进后的快恢复
        TCP New Reno 算法改进了之前 TCP Reno 算法的缺陷。在之前，快恢复中只要收到一个新的 ACK 包，就会退出快恢复。
        在 TCP New Reno 中，TCP 发送方先记下三个重复 ACK 的分段的最大序号。
        假如我有一个分段数据是 1 ~ 10 这十个序号的报文，其中丢失了序号为 3 和 7 的报文，那么该分段的最大序号就是 10。
        发送端只会收到 ACK 序号为 3 的应答。这时候重发序号为 3 的报文，接收方顺利接收的话就会发送 ACK 序号为 7 的应答。
        这时候 TCP 知道对端是有多个包未收到，会继续发送序号为 7 的报文，接收方顺利接收并会发送 ACK 序号为 11 的应答，
        这时发送端认为这个分段接收端已经顺利接收，接下来会退出快恢复阶段。
### 安全问题
- SYN攻击
- xss 恶意脚本注入，注入恶意脚本
   - 恶意脚本做的事情
      - 获取cookie，通过document.cookie获取cookie信息然后发送给黑客服务器，黑客利用cookie登陆用户账号
      - 监听用户行为，比如用户的输入事件等
      - 修改dom，欺骗用户输入账号密码等
      - 使浏览器弹窗，注入广告
   - 类型
      - 存储型，通过用户输入框注入恶意脚本
      - 反射型，恶意脚本作为请求的一部分拼接在请求中，服务器将其返回给客户端，当作html执行
      - 文档型，在传输过程中劫持数据包修改其中html内容
   - 解决办法
      - 设置cookie的httpOnly属性
      - 不相信用户输入
      - 使用csp策略，可以配置白名单；限制加载其他域名的脚本文件 禁止向第三方提交数据 禁止执行内联脚本和未授权的脚本
        - 前端在meta标签中加入csp
        - 后端和运维在http响应头添加csp配置
- csrf 跨站请求伪造，利用服务器漏洞和用户的登录状态进行攻击
   - 恶意脚本做的事情
      - 使用用户cookie模仿跨站请求，若服务器没有对应验证则会有恶意操作
   - 类型
      - 自动发送get请求，放一张图片自动像目标服务器发送携带cookie的请求
      - 自动发送post，黑客自己填写一个表单，自动提交也会携带cookie
      - 诱导发送get，设置一个链接诱导点击
   - 防范
      - 使用cookie的sameSite属性，strick，Lax（a、getForm、link）
      - 服务器验证站点来源，