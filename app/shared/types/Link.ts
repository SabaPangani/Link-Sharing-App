export interface ILink {
  id: string;
  platform: string;
  url: string;
  order: number;
}

export type LinkContextType = {
  links: ILink[];
  addLinks: () => void;
  getLinks: () => void;
  updateLink: (id: string, platform: string) => void;
  removeLink: (id: string) => void;
};
