export interface ILink {
  id: string;
  platform: string;
  url: string;
  order: number;
}

export type LinkContextType = {
  links: ILink[];
  isLoading: boolean;
  isEdited: boolean;
  showModal: boolean;
  setIsEdited: (value: boolean) => void;
  setShowModal: (value: boolean) => void;
  addLinks: () => void;
  getLinks: () => void;
  updateLink: (id: string, platform: string) => void;
  removeLink: (id: string) => void;
};
