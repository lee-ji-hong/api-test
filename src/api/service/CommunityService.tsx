import { LikeResponse } from "@/models";
import Axios from "../axios";

class CommunityService {
  static async requestUnlike(postId: number): Promise<LikeResponse> {
    return Axios.post<LikeResponse>(`/api/v1/post/${postId}/unlike`, {}, true);
  }

  static async requestLike(postId: number) {
    return Axios.post<LikeResponse>(`/api/v1/post/${postId}/like`, {}, true);
  }
  static async requestCommentUnlike(postId: number) {
    return Axios.post<LikeResponse>(`/api/v1/comment/${postId}/unlike`, {}, true);
  }

  static async requestCommentLike(postId: number) {
    return Axios.post<LikeResponse>(`/api/v1/comment/${postId}/like`, {}, true);
  }
}

export default CommunityService;
