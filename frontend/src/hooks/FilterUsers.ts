import { useState } from "react";
import type { User } from "../types/User";

type Props = {
  users: User[];
};

export function useFilterUsers({ users }: Props) {
  const [selectedSortOption, setSelectedSortOption] =
    useState<string>("");

  const [filteredUsers, setFilteredUsers] =
    useState<User[]>(users);

  function onSortUsers(selectedOption: string) {
    setSelectedSortOption(selectedOption);

    const usersSorted = [...users];

    switch (selectedOption) {
      case "idadeCrescente":
        usersSorted.sort(
          (a, b) => Number(a.age) - Number(b.age)
        );
        break;

      case "idadeDecrescente":
        usersSorted.sort(
          (a, b) => Number(b.age) - Number(a.age)
        );
        break;

      case "a-z":
        usersSorted.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;

      case "z-a":
        usersSorted.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
        break;
    }

    setFilteredUsers(usersSorted);
  }

  return {
    filteredUsers,
    selectedSortOption,
    onSortUsers,
  };
}