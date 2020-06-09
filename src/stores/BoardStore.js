import { observable, action, computed } from 'mobx'
import axios from 'axios'

class BoardStore {
  @observable boardList = []
  @observable currentBoardSlug

  @action
  fetchBoardList() {
    if (this.boardList.length) return

    axios.post(`${process.env.HOST}/api/get`, {
      path: 'boards'
    }).then(({ data }) => {
      this.boardList = data
    })
  }

  @action
  setCurrentBoard(slug) {
    this.currentBoardSlug = slug
  }

  @computed
  get currentBoard() {
    return this.boardList.find(board => board.slug === this.currentBoardSlug)
  }
}

export default BoardStore