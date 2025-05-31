import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AnnouncementService } from "../../services/announcement/announcement.service";
import {
  AnnouncementResponse,
  CreateAnnouncementRequest,
  UpdateAnnouncementRequest,
} from "../types/announcement.type";

export function useAnnouncements(currPage: number, dataPerPage: number, orderBy: string, title: string) {
  return useQuery<AnnouncementResponse>({
    queryKey: ["announcements", currPage, dataPerPage, orderBy, title],
    queryFn: () =>
      AnnouncementService.getAllAnnouncements(currPage, dataPerPage, orderBy, title),
  });
}

export function useCreateAnnouncement() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newAnnouncement: CreateAnnouncementRequest) =>
      AnnouncementService.createAnnouncement(newAnnouncement),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
  });
}

export function useUpdateAnnouncement() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ announcementId, updatedData }: { announcementId: string; updatedData: UpdateAnnouncementRequest }) =>
      AnnouncementService.updateAnnouncement(announcementId, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
  });
}

export function useDeleteAnnouncement() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (announcementId: string) => AnnouncementService.deleteAnnouncement(announcementId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
  });
}
