import Koa from 'koa';
import { promisify } from 'util';
import * as http from 'http';
import Router from 'koa-router';
import { AlwaysCreateInstance, SomeClassUsesAxios } from './SomeClassUsesAxios';
//import { AxiosInstance } from 'axios';

type StateT = Record<string, never>;
type CustomT = {
    dep: SomeClassUsesAxios;
};
type Middleware = Koa.Middleware<StateT, CustomT>;

function mkMiddleware():Middleware {
    return async function middleware(ctx, next) {
        // middleware で毎回 SomeClassUsesAxios のインスタンスを作る
        ctx.dep = new AlwaysCreateInstance();

        // 外部で作成した AxiosInstance を注入する
        //ctx.dep = new GetInstanceFromArgs(inst);
        return await next();
    }
}


export function mkApiRouter(router: Router<StateT, CustomT>): Router<StateT, CustomT> {
    router.get('/hello',
    async function (ctx, _next) {
        ctx.status = 200;
        ctx.body = "Hello World!"
    });

    router.get('/gc',
    async function (ctx, _next) {
        // --expose-gc オプションを付けずに実行するとエラーを吐くため、 try-catch で囲む
        try {
            (global as any).gc();
        } catch {/* ハンドリングはとくにしない */}
        ctx.status = 200;
        ctx.body = "OK";
    })

    return router;
}

export async function mkApp(): Promise<void> {
    const app = new Koa<StateT, CustomT>();

    const router = new Router<StateT, CustomT>();

    router.use(mkMiddleware() as any)

    app.use(mkApiRouter(router).routes());

    await promisify(cb =>
        http.createServer(app.callback()).listen(
            9999,
            cb as () => void,
        ),
    )();

    console.log("start\nlocalhost:9999/hello\nlocalhost:9999/gc\n")
}

mkApp().catch(() => {
    process.exit(1);
});
