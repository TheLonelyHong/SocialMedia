import hongkong from '../assets/hongkong.jpg';
import ocean from '../assets/ocean.jpg';
import strawberry from '../assets/strawberry.jpg';
import hill from '../assets/hill.jpg';

export const friendlist = [
        {
            id:1,
            nickname:"JohnDoe"
        },
        {
            id:2,
            nickname:"JaneDoe"
        },
        {
            id:3,
            nickname:"MarkDon"
        }
];

export const postsList = [
        {
            id:1,
            nickname:"John Doe",
            image:`${hongkong}`,
            title:'Hong Kong night view is the best',
            time:'1 min ago',
            likes:0,
            comments:[
                {
                    id:1,
                    whoComment:'Mark Kenny',
                    title:'Nice view'
                },
                {
                    id:2,
                    whoComment:'Philip Ian',
                    title:'Beautiful view'
                }
            ]
        },
        {
            id:2,
            nickname:"Aster Jane",
            image:`${ocean}`,
            title:'A beautiful view at ocean',
            time:'2 min ago',
            likes:2,
            comments:[
                {
                    id:1,
                    whoComment:'Ken Lunar',
                    title:'Oceannnnn!'
                },
                {
                    id:2,
                    whoComment:'Jane River',
                    title:'Wow , it is ocean!'
                }
            ]
        },
        {
            id:3,
            nickname:"Ember Queen",
            image:`${hill}`,
            title:'Hiking at the moment',
            time:'3 min ago',
            likes:10,
            comments:[
                {
                    id:1,
                    whoComment:'Jane John',
                    title:'Happy hiking !'
                },
                {
                    id:2,
                    whoComment:'Oster Pen',
                    title:'Fresh air is the best!'
                }
            ]
        },
        {
            id:4,
            nickname:"Kenny Nugget",
            image:`${strawberry}`,
            title:'Strawberry is the most delicious',
            time:'4 min ago',
            likes:0,
            comments:[
                {
                    id:1,
                    whoComment:'Isaac',
                    title:'Agreed ! Bro'
                },
                {
                    id:2,
                    whoComment:'Winnie Pool',
                    title:'I wish to have one !'
                }
            ]
        }
];