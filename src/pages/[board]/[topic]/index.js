import { useEffect, useContext } from 'react'
import axios from 'axios'
import { observer } from 'mobx-react-lite'

import { storesContext } from '../../../contexts/storesContext'
import { Layout } from '../../../components/Layout'
import { TopicPage } from '../../../components/TopicPage'

export default observer(({ posts, isRecent }) => {
  const { postStore } = useContext(storesContext)

  useEffect(() => {
    postStore.setPosts(posts)
  }, [JSON.stringify(posts)])

  return (
    <Layout>
      <TopicPage posts={posts} isRecent={isRecent} />
    </Layout>
  )
})

const fetchPosts =  async topic => {
  const { data } = await axios.post('http://localhost:3000/api/get', {
    path: `topics/${topic}/posts`
  })

  return data
}

const fetchRecentPosts = async topic => {
  const { data } = await axios.post('http://localhost:3000/api/get', {
    path: `topics/${topic}`,
    posts: 1,
  })

  return data.posts
}

export const getServerSideProps = async ({ query }) => {
  const { topic, recent } = query

  const posts = recent 
    ? await fetchRecentPosts(topic) 
    : await fetchPosts(topic)

  return {
    props: {
      posts,
      isRecent: !!recent,
    }
  }
}