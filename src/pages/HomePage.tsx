import { useState } from "react";
import { Plus, Trash2, Edit2, Check, X, Crown, Star, Shield } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Member } from "../types";

const initialMembers: Member[] = [
  { id: "1", name: "RexxyOfficial", position: "Ketua", role: "leader", icon: "crown" },
  { id: "2", name: "ZexxyGaming", position: "Wakil Ketua", role: "deputy", icon: "star" },
  { id: "3", name: "LexxyDesign", position: "Sekretaris", role: "staff", icon: "shield" },
  { id: "4", name: "NexxyCode", position: "Bendahara", role: "staff", icon: "shield" },
  { id: "5", name: "VexxyEdit", position: "Koordinator Divisi", role: "staff", icon: "shield" },
];

const iconOptions = [
  { value: "crown", label: "Crown", component: Crown },
  { value: "star", label: "Star", component: Star },
  { value: "shield", label: "Shield", component: Shield },
];

export default function HomePage() {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", position: "", icon: "shield" });

  const handleAddMember = () => {
    if (!formData.name || !formData.position) return;
    const newMember: Member = {
      id: Date.now().toString(),
      name: formData.name,
      position: formData.position,
      role: "staff",
      icon: formData.icon,
    };
    setMembers([...members, newMember]);
    setFormData({ name: "", position: "", icon: "shield" });
    setIsAdding(false);
  };

  const handleEditMember = (id: string) => {
    const member = members.find((m) => m.id === id);
    if (member) {
      setFormData({ name: member.name, position: member.position, icon: member.icon });
      setEditingId(id);
    }
  };

  const handleSaveEdit = (id: string) => {
    setMembers(
      members.map((m) =>
        m.id === id ? { ...m, name: formData.name, position: formData.position, icon: formData.icon } : m
      )
    );
    setEditingId(null);
    setFormData({ name: "", position: "", icon: "shield" });
  };

  const handleDeleteMember = (id: string) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  const getIconComponent = (iconName: string) => {
    const icon = iconOptions.find((i) => i.value === iconName);
    return icon ? icon.component : Shield;
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "leader":
        return "from-red-600 to-red-700";
      case "deputy":
        return "from-red-500 to-red-600";
      default:
        return "from-neutral-700 to-neutral-800";
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/20 rounded-full mb-4">
          <Crown className="w-5 h-5 text-red-500" />
          <span className="text-red-400 text-sm font-medium">Official Organization</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
          Sekte Creator <span className="text-red-500">Kece</span> Official
        </h1>
        <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
          Komunitas kreator konten terbaik dengan struktur organisasi yang solid dan profesional
        </p>
      </div>

      {/* Add Button */}
      <div className="flex justify-end mb-6">
        {isAdding ? (
          <Card className="w-full bg-neutral-900 border-red-900/30">
            <CardHeader>
              <CardTitle className="text-white text-lg">Tambah Anggota Baru</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                  placeholder="Nama"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500 focus:border-red-500"
                />
                <Input
                  placeholder="Jabatan"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500 focus:border-red-500"
                />
                <select
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="bg-neutral-800 border border-neutral-700 text-white rounded-md px-3 py-2 focus:border-red-500 focus:outline-none"
                >
                  {iconOptions.map((icon) => (
                    <option key={icon.value} value={icon.value}>
                      {icon.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddMember} className="bg-red-600 hover:bg-red-700 text-white">
                  <Check className="w-4 h-4 mr-2" /> Simpan
                </Button>
                <Button
                  onClick={() => {
                    setIsAdding(false);
                    setFormData({ name: "", position: "", icon: "shield" });
                  }}
                  className="bg-neutral-700 hover:bg-neutral-600 text-white"
                >
                  <X className="w-4 h-4 mr-2" /> Batal
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Button
            onClick={() => setIsAdding(true)}
            className="bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/30"
          >
            <Plus className="w-4 h-4 mr-2" /> Tambah Anggota
          </Button>
        )}
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((member) => {
          const IconComp = getIconComponent(member.icon);
          const isEditing = editingId === member.id;

          return (
            <Card
              key={member.id}
              className={`bg-gradient-to-br ${getRoleColor(member.role)} border-0 overflow-hidden group hover:scale-105 transition-all duration-300`}
            >
              <CardContent className="p-6">
                {isEditing ? (
                  <div className="space-y-3">
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-neutral-800/50 border-neutral-600 text-white"
                    />
                    <Input
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      className="bg-neutral-800/50 border-neutral-600 text-white"
                    />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleSaveEdit(member.id)}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => setEditingId(null)}
                        className="bg-neutral-600 hover:bg-neutral-500 text-white"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                        <IconComp className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEditMember(member.id)}
                          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteMember(member.id)}
                          className="p-2 rounded-lg bg-white/10 hover:bg-red-500/50 text-white transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-white/70 text-sm">{member.position}</p>
                  </>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Stats */}
      <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Anggota", value: members.length, color: "text-red-500" },
          { label: "Ketua", value: members.filter((m) => m.role === "leader").length, color: "text-amber-500" },
          { label: "Wakil", value: members.filter((m) => m.role === "deputy").length, color: "text-orange-500" },
          { label: "Staff", value: members.filter((m) => m.role === "staff").length, color: "text-neutral-400" },
        ].map((stat, idx) => (
          <div key={idx} className="bg-neutral-900 rounded-xl p-4 border border-red-900/20">
            <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
            <p className={`text-sm ${stat.color}`}>{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
