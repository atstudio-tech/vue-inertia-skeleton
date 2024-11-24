export const flash = (notification: string | App.Data.FlashData, type?: App.Enums.FlashType): void => {
    if (typeof notification === 'string') {
        // return notify({
        //     type: type ?? 'info',
        //     title: notification,
        // })
    }

    // notify({
    //     type: notification.type,
    //     title: notification.title,
    //     text: notification.message as string | undefined,
    // })
}

export const FlashPlugin = () => {
    router.on('finish', () => {
        const notification = usePage().props.flash

        if (notification) {
            flash(notification)
        }
    })
}

// export const Toast = library
