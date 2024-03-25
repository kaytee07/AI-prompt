import Feed from "@components/Feed"
const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
            Discover & Share
            <br className="max-sd:hidden"/>
            <span className="orange_gradient">AI-Powered Prompts</span>
        </h1>
        <p className="desc text-center">
            promptAI is an open-source AI prompting tool
            for modern world to discover, create and share creative
            AI prompts
        </p>

        {/* Feed */}
        <Feed/>
    </section>
  )
}

export default Home
