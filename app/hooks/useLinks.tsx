import { useContext } from "react";
import { LinkContext } from "../store/linksContext";

export const useLinks = () => useContext(LinkContext);
