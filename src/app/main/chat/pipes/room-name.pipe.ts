import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../users/types/user.types';

@Pipe({
  name: 'roomName',
  standalone: true,
})
export class RoomNamePipe implements PipeTransform {
  transform(members: User[], myId: number): string | null {
    return (
      members
        .filter((usr) => usr.id !== myId)
        .map((usr) => usr.username)
        .join(' & ') || null
    );
  }
}
