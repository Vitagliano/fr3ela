"use client";

import { CategoryFieldDoc, FieldType } from "@/types/field";
import { useState } from "react";
import { Button } from "../Button";

export type CategoryFieldProps = {
  field: CategoryFieldDoc;
  onEdit(field: CategoryFieldDoc): void;
  onDelete(): void;
};

function CategoryField({ field, onEdit, onDelete }: CategoryFieldProps) {
  const [isEditing, setIsEditing] = useState(false);

  const [fieldEdit, setFieldEdit] = useState<CategoryFieldDoc>(field);

  return (
    <div>
      {isEditing ? (
        <span className="text-lg">
          {field.label} - {field.type}
        </span>
      ) : (
        <>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Field Name"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 py-1 px-3"
            onChange={e => setFieldEdit(p => ({ ...p, label: e.target.value }))}
            value={fieldEdit.label}
          />{" "}
          -{" "}
          <select
            name="type"
            id="type"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 py-1 px-3"
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
        </>
      )}

      <div>
        <Button
          onClick={() => {
            if (isEditing) {
              onEdit(fieldEdit);
            }

            setIsEditing(p => !p);
          }}
        >
          {isEditing ? "Save" : "Edit"}
        </Button>
        <Button className="bg-red-700" onClick={onDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
}

export default CategoryField;
