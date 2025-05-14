import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LogbookService } from "../../services/logbook/logbook.service";
import { Logbook } from "../validation/logbook.validation";
import { axiosErrorHandling } from "../../services/setup.service";
import toast from "react-hot-toast";

export const useLogbookMutation = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (data: Logbook) => LogbookService.create(data),
    onSuccess: (response) => {
      toast.success(response.data.message);
      client.invalidateQueries({ queryKey: ["logbooks"] });
    },
    onError: (error) => {
      const message = axiosErrorHandling(error);
      toast.error(message);
    },
  });
};
