import { Timestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import Spinner from 'react-bootstrap/Spinner';

export class User{
        constructor(userId , username , email , profileImgUrl , profileImg){
                this.userId = userId;
                this.username = username;
                this.email = email;
                this.profileImgUrl = profileImgUrl;
                this.profileImg = profileImg;
        }
        toString(){
                return this.userId + ", " + this.username + ", " + this.email + ", " + this.profileImgUrl + ", " + this.profileImg;
        }
}

export const userConverter = {
        toFirestore:(user) => {
                return {
                     friendList:[],
                     userId:user.userId,
                     username:user.username,
                     email:user.email,
                     profileImgUrl:user.profileImgUrl,
                     profileImg:user.profileImg,
                     backgroundImg:"",
                     backgroundImgUrl:"",
                     createdAt:Timestamp.fromDate(new Date()),
                     nickname:user.username,
                     description:""
                };
        },
        fromFirestore:(snapshot , options) => {
                const data = snapshot.data(options);
                return new User(data.userId , data.username , data.email , data.profileImgUrl , data.profileImg);
        }
};

export class Post{
                constructor(title , imgUrl , img , email , username , createdUid , userImgUrl){
                                this.title = title;
                                this.imgUrl = imgUrl;
                                this.img = img;
                                this.email = email;
                                this.username = username;
                                this.createdUid = createdUid;
                                this.userImgUrl = userImgUrl;
                }
                toString(){
                        return this.title + ", " + this.imgUrl + ", " + this.img + ", " + this.email + ", " + this.username + ", " + this.createdUid + ", " + this.userImgUrl;
                }
}

export const postConverter = {
        toFirestore:(post) => {
                        return {
                                likes:[],
                                comments:[],
                                title:post.title,
                                imgUrl:post.imgUrl,
                                img:post.img,
                                userImg:post.userImgUrl,
                                email:post.email,
                                username:post.username,
                                createdUid:post.createdUid,
                                createdAt:Timestamp.fromDate(new Date())
                        }
        },
        fromFirestore:(snapshot , options) => {
                const data = snapshot.data(options);
                return new Post(data.title , data.imgUrl , data.img , data.email , data.username , data.createdUid , data.userImg);
        }
};

export const showMsg = (code , msg) => {
            switch(code){
                    case 'SUCCESS':
                            toast.success(msg , {
                                    position:"bottom-right",
                                    autoClose:2500,
                                    theme:"light"
                            });
                            break;
                    case 'ERROR':
                            toast.error(msg , {
                                    position:"bottom-right",
                                    autoClose:2500,
                                    theme:"light"
                            });
                            break;
                    default:
                        return false;
            }
}

export const Loader = () => {
        return (
                <div className='w-100 d-flex justify-content-center align-items-center'>
                        <Spinner animation='border'>
                                <span className='visually-hidden'>loading...</span>
                        </Spinner>
                </div>
        );
}

export const convertTimestamp = (seconds , nanoseconds) => {
        const timestamp = new Timestamp(seconds , nanoseconds);
        const month = timestamp.toDate().getMonth();
        let day = timestamp.toDate().getDate();
        const year = timestamp.toDate().getFullYear();
        let hour = timestamp.toDate().getHours();
        let minutes = timestamp.toDate().getMinutes();

        const months = ["Jan" , "Feb" , "Mar" , "Apr" , "May" , "Jun" , "July" , "Aug" , "Sep" , "Oct" , "Nov" , "Dec"];
        day = day < 10 ? `0${day}`: day;
        hour = hour < 10 ? `0${hour}` : hour;
        minutes = minutes < 10 ? `0${minutes}`:minutes;

        return `${day}/${months[month]}/${year} ${hour}:${minutes}`;
};

export const sortLatestPost = ({post}) => {
                const allPosts = [...post];
                allPosts.sort(function(a,b){
                        const x = new Timestamp(a.createdAt.seconds , a.createdAt.nanoseconds).toDate();
                        const y = new Timestamp(b.createdAt.seconds , b.createdAt.nanoseconds).toDate();
                        return y - x;
                });
                return allPosts;
}
