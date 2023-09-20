import { HttpClient, HttpHeaders } from '@angular/common/http';
import { identifierModuleUrl, ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NodeapiService {
  private configUrl = 'http://localhost:3002';
  headers = new HttpHeaders();
  private hd = this.headers.set(
    'Content-Type',
    'application/json; charset-utf-8'
  )


  constructor(private http: HttpClient) { }

  /////////////////////////////(Login API)//////////////////////////////////////

  getAllUser(){
    return this.http.get(this.configUrl+"/api/allusers");
  }

  /////////////////////////////(SubAdmin API)//////////////////////////////////////

  getSubAdmin() {
    return this.http.get(this.configUrl + '/api/getsubadmin')
  }
  postSubAdmin(data){
    return this.http.post(this.configUrl+'/api/getsubadmin', { data })
  }
  getSubAdminID(id) {
    return this.http.get(this.configUrl + '/api/getsubadmin/' + id)
  }

  putSubAdmin(id, data) {
    return this.http.put(this.configUrl + '/api/getsubadmin/' + id, { data })
  }

  deleteSubAdmin(id) {
    return this.http.delete(this.configUrl + '/api/getsubadmin/delete/' + id);
  }
  /////////////////////////////(User API)//////////////////////////////////////

  getUser() {
    return this.http.get(this.configUrl + '/api/getusers')
  }
  postUser(data) {
    return this.http.post(this.configUrl+'/api/getusers', { data })
  }

  getUserID(id) {
    return this.http.get(this.configUrl + '/api/getusers/' + id)
  }

  putUser(id, data) {
    return this.http.put(this.configUrl + '/api/getusers/' + id, { data })
  }

  deleteUser(id) {
    return this.http.delete(this.configUrl + '/api/getusers/delete/' + id);
  }


  /////////////////////////////(Task API)//////////////////////////////////////
  getTask() {
    return this.http.get(this.configUrl + '/api/gettasks')
  }

  postTask(data) {
    return this.http.post(this.configUrl + '/api/gettasks', { data })
  }

  getTaskindex(id) {
    return this.http.get(this.configUrl + '/api/gettasks/' + id)
  }

  postUpdateTask(id, data) {
    return this.http.put(this.configUrl + '/api/gettasks/' + id, { data })
  }

  deleteTask(id) {
    return this.http.delete(this.configUrl + '/api/gettasks/delete/' + id)
  }

  /////////////////////////////(User Task API)//////////////////////////////////////
   getTaskData(user){
    return this.http.get(this.configUrl + '/api/tasks/'+ user);
   }

   getTaskName(user,tname){
    return this.http.get(this.configUrl+'/api/gettaskname/'+user+'/'+tname)
   }

   postSubTask(user,task,subtask){
    return this.http.post(this.configUrl+'/api/postSubTask/'+user+'/'+task,{subtask})
   }

   putSubTask(user,task,subtask){
    return this.http.post(this.configUrl+'/api/updateSubTask/'+user+'/'+task,{subtask})
   }

   postProgress(user,tname,data){
    return this.http.put(this.configUrl+'/api/postProgress/'+user+'/'+tname,{data})
   }

   /////////////////////////////(Forgot Password API)//////////////////////////////////////
   checkuser(user,email){
    return this.http.get(this.configUrl+'/api/getuser/'+user+'/'+email)
   }

   changepass(user,email,data){
    return this.http.put(this.configUrl+'/api/updateuser/'+user+'/'+email,{data})
   }
}
