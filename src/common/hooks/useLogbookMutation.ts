import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LogbookService } from "../../services/logbook/logbook.service";
import { Logbook } from "../validation/logbook.validation";

// Type for update data - sesuai dengan backend
export interface UpdateLogbookData {
  description?: string;
  duration?: number;
  file?: File;
}

export const useLogbookMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Logbook) => LogbookService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["logbooks"] });
    },
  });
};

export const useUpdateLogbookMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ logbookId, data }: { logbookId: string; data: UpdateLogbookData }) => 
      LogbookService.update(logbookId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["logbooks"] });
    },
  });
};

export const useDeleteLogbookMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (logbookId: string) => LogbookService.delete(logbookId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["logbooks"] });
    },
  });
};