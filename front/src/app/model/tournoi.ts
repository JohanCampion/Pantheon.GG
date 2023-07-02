export interface Tournoi {
  tournamentId: number;
  name?: string;
  createur?: string;
  status?: string;
  date_de_debut: string;
  date_de_fin?: number;
  participants?: string[];
  checked?: string[];
  nombreParticipants?: number;
  winner: string[];
}
