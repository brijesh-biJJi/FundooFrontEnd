// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  userApiUrl:'http://localhost:8080/users',
  

  /*Authentication URl*/
  registerUrl:'/register',
  loginURL:'/login',
  userActivUrl:'/register/activ',
  forgotPasswordUrl:'/forgotpassword',
  changePasswordUrl:'/changePassword',

  // Note URL
  noteApiURL:'http://localhost:8080/note',
  createNote:'create',
  getOtherNotes:'getOtherNotes',
  getAllNotes:'getAllNotes',
  archiveNote:'archive',
  getAllArchiveNotes:'getArchivedNotes',
  pinNote:'pin',
  getPinnedNotes:'getPinnedNotes',
  trashNote:'delete',
  deletePermanently:'deletePermanently',
  getAllTrashNotes:'getTrashedNotes',
  changecolor:'changecolor',
  searchNote:'search',
  updateNote:'update',
  retrieveLabels:'retrieveLabels',
  addReminder:'addReminder',
  removeReminder:'removeReminder',

  //Label URL
  labelApiURL:'http://localhost:8080/label',
  getAllLabels:'getAllLabel',
  editLabel:'editLabel',
  createLabel:'createLabel',
  deleteLabel:'deleteUserLabel',
  addMapLabel:'addMapLabel',
  getNotesByLabel:'getnotesbylabel',
  removeNoteLabel:'removeNoteLabel',
  retrieveNotes:'retrieveNotes',


  //Collaborator
  collaborator:'collaborator',
  addCollab:'addcollab',
  removeCollab:'removecollab',
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
