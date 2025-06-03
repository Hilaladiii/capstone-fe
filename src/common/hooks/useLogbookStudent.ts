import { useQuery } from "@tanstack/react-query";
import { LogbookService } from "../../services/logbook/logbook.service";

export const useLogbookStudent = () => {
  return useQuery({
    queryKey: ["logbooks"],
    queryFn: () => LogbookService.getStudentLogbook(),
  });
};
