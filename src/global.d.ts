declare var require: NodeRequire

interface Window {
    pageData: {
        isLogin: boolean
        cloudUid: string
        userId: string
        deviceId: string,
        isWBApp: boolean;
    }
    WBAPP: {
        action: {
            getUserInfo: (key?: string, callback?: (state:any) => any) => any
        },
        invoke: any
    },
    WBAPPCB: any,
    $vue: any
}

declare var process : {
    env: {
        V_CONSOLE: string
        BASE: string
    }
}
