"use client";

import { CategoryFieldDoc, FieldType } from "@/types/field";
import { useState } from "react";
import { Button } from "../Button";
import { Card } from "../Card";

export type CategoryFieldProps = {
  field: CategoryFieldDoc;
  onEdit?(field: CategoryFieldDoc): void;
  onDelete?(): void;
  onCancel?(): void;
  newField?: boolean;
};

function CategoryField({
  field,
  onEdit,
  onDelete,
  onCancel,
  newField
}: CategoryFieldProps) {
  const [isEditing, setIsEditing] = useState(!!newField);

  const [fieldEdit, setFieldEdit] = useState<CategoryFieldDoc>({ ...field });

  return (
    <div className="grid grid-cols-12 gap-8">
      {isEditing ? (
        <div className="flex gap-2 items-center col-span-8">
          <input
            type="text"
            id="name"
            placeholder="Field Name"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 py-1 px-3"
            onChange={e => setFieldEdit(p => ({ ...p, label: e.target.value }))}
            value={fieldEdit.label}
          />
          -
          <select
            id="type"
            className="block w-full md:max-w-[150px] rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 py-1 px-3"
            onChange={e =>
              setFieldEdit(p => ({ ...p, type: e.target.value as FieldType }))
            }
            value={fieldEdit.type}
          >
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="checkbox">Checkbox</option>
            <option value="date">Date</option>
            <option value="select">Select</option>
            <option value="radio">Radio</option>
            <option value="textarea">Textarea</option>
            <option value="file">File</option>
          </select>
        </div>
      ) : (
        <span className="text-lg card py-2 px-4 col-span-8">
          {field.label} - {field.type}
        </span>
      )}

      <div className="flex gap-4 col-span-4">
        <Button
          type="button"
          onClick={() => {
            isEditing && onEdit && onEdit(fieldEdit);
            setIsEditing(p => !p);
          }}
          className="basis-1/2"
        >
          {isEditing ? "Save" : "Edit"}
        </Button>
        <Button
          type="button"
          onClick={() => {
            if (isEditing) onCancel && onCancel();
            else onDelete && onDelete();
            setIsEditing(p => !p);
          }}
          className="bg-red-700 hover:!bg-red-800 basis-1/2"
        >
          {isEditing ? "Cancel" : "Delete"}
        </Button>
      </div>
    </div>
  );
}

export default CategoryField;
