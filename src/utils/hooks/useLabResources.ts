import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { LabResource } from "@/pages/dashboard/admin/LabResourceTable";
import { NewResource } from "@/pages/dashboard/admin/AddResourceDialog";
import { MOCK_LAB_RESOURCES } from "@/data/mock/labs";

export function useLabResources() {
  const [resources, setResources] = useState<LabResource[]>([]);
  const [resourcesLoading, setResourcesLoading] = useState(true);
  const [resourcesError, setResourcesError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setResources(MOCK_LAB_RESOURCES as LabResource[]);
      setResourcesLoading(false);
    }, 400);
  }, []);

  const dashboardStats = null;
  const statsLoading = false;
  const statsError = null;

  // Calculate dashboard stats
  const totalResources = resources ? resources.length : 0;
  const totalItems = resources ? resources.reduce((sum, r) => sum + r.quantity, 0) : 0;
  const availableItems = resources ? resources.reduce((sum, r) => sum + r.available, 0) : 0;
  const inUseItems = resources ? resources.reduce((sum, r) => sum + (r.quantity - r.available), 0) : 0;
  const needsMaintenance = resources ? resources.filter(r => {
    const lastMaintenance = new Date(r.lastMaintenance || "");
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    return lastMaintenance < threeMonthsAgo;
  }).length : 0;
  
  // Resource types
  const resourceTypes = ["Science", "Technology", "Art", "Sports", "Music"];
  
  // Add new resource handler
  const handleAddResource = async (newResource: NewResource) => {
    try {
      const resourceToAdd = { ...newResource, id: Math.random().toString() } as LabResource;
      setResources(prev => [...prev, resourceToAdd]);
      toast({
        title: "Success",
        description: "Resource added successfully",
      });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };
  
  // Delete resource handler
  const handleDeleteResource = async (id: string) => {
    try {
      setResources(prev => prev.filter(r => r.id !== id));
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };
  
  // Schedule maintenance handler
  const handleScheduleMaintenance = async (id: string) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      setResources(prev => prev.map(r => r.id === id ? { ...r, lastMaintenance: today } : r));
      toast({
        title: "Maintenance Scheduled",
        description: "Maintenance has been scheduled for today.",
      });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };
  
  const refreshResources = async () => {};

  return {
    resources,
    resourcesLoading,
    resourcesError,
    dashboardStats,
    statsLoading,
    statsError,
    totalResources,
    totalItems,
    availableItems,
    inUseItems,
    needsMaintenance,
    resourceTypes,
    handleAddResource,
    handleDeleteResource,
    handleScheduleMaintenance,
    refreshResources
  };
}
