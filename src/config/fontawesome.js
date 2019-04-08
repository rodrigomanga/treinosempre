import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faEdit, faTrash, faDumbbell, faRedo, faListOl, faCopy, faUpload, faEllipsisV } from '@fortawesome/free-solid-svg-icons'

library.add(faEdit, faTrash, faDumbbell, faRedo, faListOl, faCopy, faUpload, faEllipsisV);

Vue.component('font-awesome-icon', FontAwesomeIcon); // registered globally