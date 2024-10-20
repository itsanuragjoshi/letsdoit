import { Button } from "@app/components/Button";
import { Trash2Icon } from "lucide-react";

const ConfirmDeleteModal = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
        <h2 className="text-lg font-semibold mb-4">Delete Task?</h2>
        <p>This task will be permanently deleted.</p>
        <div className="flex justify-end gap-2 mt-8">
          <Button
            variant="outline"
            size="medium"
            showIcon={false}
            showText={true}
            onClick={onClose}
            aria-label="Cancel"
            title="Cancel"
            text="Cancel"
          />
          <Button
            variant="solid"
            size="medium"
            icon={Trash2Icon}
            showIcon={true}
            showText={true}
            onClick={onDelete}
            aria-label="Delete Task"
            title="Delete"
            text="Delete"
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
