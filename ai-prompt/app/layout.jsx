import '@styles/globals.css'

export const metadata = {
    title: "ai-prompt",
    description: "Discover and share AI Prompts"
}

const layout = () => {
    return (
        <html lang="en">
            <body>
                <div className="main">
                    <div className="gradient" />
                </div>
                <main className="app">
                    {children}
                </main>
            </body>
        </html>
    )
}

export default layout;