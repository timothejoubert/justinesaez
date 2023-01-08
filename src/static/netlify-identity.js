if ('netlifyIdentity' in window) {
    window.netlifyIdentity.on('init', (user) => {
        if (!user) {
            window.netlifyIdentity.on('login', () => {
                document.location.href = '/admin/'
            })
        }
    })
}
