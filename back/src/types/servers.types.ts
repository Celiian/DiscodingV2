export interface ServerCreateBody {
  name: string;
  icon: Blob;
  owner: String;
}

export interface Server {
  name: String;
  icon: Blob;
  owner: String;
}
