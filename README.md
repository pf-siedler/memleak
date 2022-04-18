# 調査メモ

middleware が koa-router のみの状態で 10000回リクエストを投げると 0.5MB ほどメモリリークする

![koa-router only](./screenshot/koa-router-only.png)

axios instance を毎回作成する midddleware を挟むとちょっとだけリークが増える

![with axios](./screenshot/with-axios.png)

他に調査したいもの

- google api
- AWS
- gRPC client
