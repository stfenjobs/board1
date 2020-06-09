import { observable, action } from 'mobx'
import axios from 'axios'
import { promised } from 'q'

class TopicStore {
  @observable topics = []
  @observable currentTopic

  @action
  setTopics(topics) {
    this.topics = topics
  }

  @action
  setCurrentTopic(id) {
    const topic = this.topics.find(topic => Number(topic.id) === Number(id))
    if (topic) {
      this.currentTopic = topic
      return
    }

    axios.post(`${process.env.HOST}/api/get`, {
      path: `topics/${id}`,
    }).then(({ data }) => {
      this.currentTopic = data
      this.topics = [data]
    })
  }
}

export default TopicStore