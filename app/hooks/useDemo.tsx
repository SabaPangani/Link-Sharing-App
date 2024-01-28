import { useContext } from "react";
import { DemoContext } from "../store/demoContext";

export const useDemo = () => useContext(DemoContext);
