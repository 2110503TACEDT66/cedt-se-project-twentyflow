import { motion } from "framer-motion";
import "src/App.css";
interface ActionProps {
  setDate: any;
  date: any;
  selectRange: boolean;
  setSelectRange: any;
}
const Actions = (props: ActionProps) => {
  const { setDate, date, selectRange, setSelectRange } = props;
  return (
    <motion.div
      initial={{ y: 1000 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
    >
      
    </motion.div>
  );
};

export default Actions;
