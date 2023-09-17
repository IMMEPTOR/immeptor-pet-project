import { createRouter, createWebHistory } from 'vue-router'
import feedPage from './views/FeedPage.vue'
import LoginPage from './views/AuthLoginPage.vue'
import AutorizateAccaunt from './views/AuthorazateAccountPage.vue'
import ChatsAccountPage from './views/ChatPage.vue'
import ProfilePage from './views/ProfilePage.vue'
import RegistrationPage from './views/AuthRegisterPage.vue'

import FeedPanel from './views/AdminPanel.vue';
import editPage from './views/EditAccountAdminInfoPanel.vue';
export default createRouter({
    // История переходов сохраняется
    history: createWebHistory(),


    // Роуты и компоненты
    routes: [
        {
            path: '/',
            name: 'fe',
            component: feedPage,
            beforeEnter(to, from, next) {
                if (!document.cookie) {
                    next(true);
                } else {
                    next('feed')
                }
            }
        },
        {
            path: '/voin',
            name: 'voin',
            component: LoginPage,
            beforeEnter(to, from, next) {
                if (!document.cookie) {
                    next(true);
                } else {
                    next('feed')
                }
            }

        },
        {
            path: '/feed',
            name: 'feed',
            component: AutorizateAccaunt
        },
        {
            path: '/chats',
            name: 'chats',
            component: ChatsAccountPage
        },
        {
            path: '/profile',
            name: 'profile',
            component: ProfilePage,
            beforeEnter(to, from, next) {
                let token = document.cookie;
                if (token) {
                    next(true);
                } else {
                    next(false);
                }
            }
        },
        {
            path: '/registration',
            name: 'registration',
            component: RegistrationPage,
            beforeEnter(to, from, next) {
                if (!document.cookie) {
                    next(true);
                } else {
                    next('feed')
                }
            }
        },
        {
            path: '/admin/aplication/control',
            name: 'feedPanel',
            component: FeedPanel
        },
        {
            path: '/admin/control/edited',
            name: 'editDataUser',
            component: editPage
        },
    ]
})