//此文件用来存放全局类型
type RecordItem = {
  tags: Tag[];
  notes: string;
  type: string;
  amount: number; //数据类型
  createdAt?: string; //类
};

type Tag = {
  id: string;
  name: string;
};
// 箭头前是输入的参数的类型 箭头后是输出的参数的类型  void是不返回
type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string) => "success" | "duplicated"; //联合类型  success 表示成功 duplicated 表示name重复 返回值只能是这两个中的
  save: () => void;
  update: (id: string, name: string) => "success" | "not found" | "duplicated";
  remove: (id: string) => boolean;
};

// 在这里声明了currentTag类型
type RootState = {
  recordList: RecordItem[];
  createRecordError: Error | null;
  createTagError: Error | null;
  tagList: Tag[];
  currentTag?: Tag;
};

interface Window {}
