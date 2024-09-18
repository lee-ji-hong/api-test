import Axios from "../axios";

class CommunityService {
  static async requestUnlike(postId: number) {
    return Axios.post(`/api/v1/post/${postId}/unlike`, {}, true);
  }

  static async requestLike(postId: number) {
    return Axios.post(`/api/v1/post/${postId}/like`, {}, true);
  }
}

export default CommunityService;
